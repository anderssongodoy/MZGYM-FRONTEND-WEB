import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export const Membresia = () => {
    const [showModal, setShowModal] = useState(false);
    const [membresias, setMembresias] = useState([]);
    const [selectedMembresia, setSelectedMembresia] = useState(null);
    const [showMembresiaDetailsModal, setShowMembresiaDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingMembresia, setEditingMembresia] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [daysDuration, setDaysDuration] = useState('');
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDaysDuration, setEditDaysDuration] = useState('');

    useEffect(() => {
        async function fetchMembresias() {
            try {
                const response = await axios.get('https://mzgym2-production.up.railway.app/api/membership/list');
                setMembresias(response.data);
            } catch (error) {
                console.error('Error al obtener membresias', error);
            }
        }
        fetchMembresias();
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowMembresiaDetailsModal(false);
        setShowEditModal(false)
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://mzgym2-production.up.railway.app/api/membership/create', {
                name,
                price: parseFloat(price),
                description,
                daysDuration: parseInt(daysDuration),
            });

            console.log(response.data);
            toast.success('Membresía registrada exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al registrar membresía', error);
            toast.error('Error al registrar membresía');
        }
    };

    const openMembresiaDetailsModal = async (membershipUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/membership/findbyid/${membershipUuid}`);
            const membresiaDetails = response.data;
            setSelectedMembresia(membresiaDetails);
            setShowMembresiaDetailsModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de membresía', error);
        }
    };

    const openEditModal = async (membershipUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/membership/findbyid/${membershipUuid}`);
            const membresiaDetails = response.data;
            setEditingMembresia(membresiaDetails);
            setEditName(membresiaDetails.name);
            setEditPrice(membresiaDetails.price.toString());
            setEditDescription(membresiaDetails.description);
            setEditDaysDuration(membresiaDetails.daysDuration.toString());
            setShowEditModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de membresía para editar', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://mzgym2-production.up.railway.app/api/membership/update/${editingMembresia.membershipUuid}`, {
                name: editName,
                price: parseFloat(editPrice),
                description: editDescription,
                daysDuration: parseInt(editDaysDuration),
            });

            console.log(response.data);
            toast.success('Membresía actualizada exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al actualizar membresía', error);
            toast.error('Error al actualizar membresía');
        }
    };


    return (
        <>
        <Toaster />
            <div className="text-primary font-black text-4xl">
                Membresias
            </div>
            <div className="text-primary hover:text-white hover:bg-primary rounded-md px-10 text-center mr-96 py-2 font-black text-2xl bg-white mt-10 cursor-pointer" onClick={openModal}>
                Registrar Membresia
            </div>
            <div className="bg-table mt-10 rounded-xl">
                <div className="text-white font-black ml-5 pt-10 text-xl">Mantenimiento de Membresias</div>
                <table className="table-auto w-full mt-5">
                    <thead>
                        <tr className='text-white'>
                            <th className="px-10 py-2">Membresia ID</th>
                            <th className="px-10 py-2">Nombre</th>
                            <th className="px-10 py-2">Precio</th>
                            <th className="px-10 py-2">Duración</th>
                            <th className="px-10 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {membresias.map((membresia, index) => (
                            <tr className='text-center text-white' key={membresia.membershipUuid}>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-textbutton hover:underline hover:bg-primary hover:text-white bg-white px-8 py-2 rounded-2xl"
                                        onClick={() => openMembresiaDetailsModal(membresia.membershipUuid)}
                                    >
                                        {index + 1}
                                    </button>
                                </td>
                                <td className="border px-4 py-2">{membresia.name}</td>
                                <td className="border px-4 py-2">{membresia.price}</td>
                                <td className="border px-4 py-2">{membresia.daysDuration} días</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-white text-textbutton hover:bg-primary hover:text-white rounded-2xl py-2 px-8"
                                        onClick={() => openEditModal(membresia.membershipUuid)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center   bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl'>Registra la nueva Membresia</div>
                        <div className='text-primary font-bold text-4xl my-5'>Registro</div>
                        <div>Nombre</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div>Precio</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Precio"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <div>Descripción</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Descripción"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <div>Duración</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Duración (días)"
                            value={daysDuration}
                            onChange={e => setDaysDuration(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-primary text-white py-2 px-4 rounded border-4 border-primary hover:bg-primary-dark hover:text-primary hover:bg-white"
                                onClick={handleRegister}
                            >
                                Registrar
                            </button>
                            <button
                                className="bg-white text-primary py-2 px-4 rounded border-4 border-primary hover:bg-primary-dark hover:text-white hover:bg-primary"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showMembresiaDetailsModal && selectedMembresia && (
                <div className="fixed inset-0 flex items-center bg-black bg-opacity-50 ">
                    <div className="bg-white p-8 rounded-md shadow-md m-64">
                        <button
                            className="bg-primary text-white py-2 px-4 rounded border-4 border-primary hover:bg-primary-dark hover:text-primary hover:bg-white"
                            onClick={closeModal}
                        >
                            Atrás
                        </button>
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl mt-5'>{selectedMembresia.name}</div>
                        <div className='text-primary font-bold text-4xl my-5'>Detalles</div>
                        <div>Descripción: {selectedMembresia.description}</div>
                        <div>Precio: {selectedMembresia.price}</div>
                    </div>
                </div>
            )}
            {showEditModal && editingMembresia && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary pb-2 px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl'>Editar Membresia</div>
                        <div>Nombre</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Nombre"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                        />
                        <div>Precio</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Precio"
                            value={editPrice}
                            onChange={e => setEditPrice(e.target.value)}
                        />
                        <div>Descripción</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Descripción"
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                        />
                        <div>Duración</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Duración (días)"
                            value={editDaysDuration}
                            onChange={e => setEditDaysDuration(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-primary text-white py-2 px-4 rounded border-4 border-primary hover:bg-primary-dark hover:text-primary hover:bg-white"
                                onClick={handleUpdate}
                            >
                                Actualizar
                            </button>
                            <button
                                className="bg-white text-primary py-2 px-4 rounded border-4 border-primary hover:bg-primary-dark hover:text-white hover:bg-primary"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}