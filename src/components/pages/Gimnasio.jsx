import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const Gimnasio = () => {
    const [showModal, setShowModal] = useState(false);
    const [gimnasios, setGimnasios] = useState([]);
    const [selectedGimnasio, setSelectedGimnasio] = useState(null);
    const [showGimnasioDetailsModal, setShowGimnasioDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingGimnasio, setEditingGimnasio] = useState(null);
    const [tradename, setTradename] = useState('');
    const [district, setDistrict] = useState('');
    const [description, setDescription] = useState('');
    const [direction, setDirection] = useState('');
    const [editTradename, setEditTradename] = useState('');
    const [editDistrict, setEditDistrict] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDirection, setEditDirection] = useState('');

    useEffect(() => {
        async function fetchMembresias() {
            try {
                const response = await axios.get('https://mzgym2-production.up.railway.app/api/gym/list');
                setGimnasios(response.data);
            } catch (error) {
                console.error('Error al obtener gimnasios', error);
            }
        }
        fetchMembresias();
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowGimnasioDetailsModal(false);
        setShowEditModal(false)
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://mzgym2-production.up.railway.app/api/gym/create', {
                tradename,
                district,
                description,
                direction
            });

            console.log(response.data);
            toast.success('Gimnasio registrado exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al registrar gimnasio', error);
            toast.error('Error al registrar gimnasio');
        }
    };

    const openGimnasioDetailsModal = async (gymUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/gym/findbyid/${gymUuid}`);
            const gimnasioDetails = response.data;
            setSelectedGimnasio(gimnasioDetails);
            setShowGimnasioDetailsModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de gimnasio', error);
        }
    };

    const openEditModal = async (gymUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/gym/findbyid/${gymUuid}`);
            const gimnasioDetails = response.data;
            setEditingGimnasio(gimnasioDetails);
            setEditTradename(gimnasioDetails.tradename);
            setEditDistrict(gimnasioDetails.district);
            setEditDescription(gimnasioDetails.description);
            setEditDirection(gimnasioDetails.direction);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de gimnasio para editar', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://mzgym2-production.up.railway.app/api/gym/update/${editingGimnasio.gymUuid}`, {
                tradename: editTradename,
                district: editDistrict,
                description: editDescription,
                direction: editDirection,
            });

            console.log(response.data);
            toast.success('Gimnasio actualizado exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al actualizar gimnasio', error);
            toast.error('Error al actualizar gimnasio');
        }
    };
    return (
        <>
            <Toaster />
            <div className="text-primary font-black text-4xl">
                Gimnasios
            </div>
            <div className="text-primary hover:text-white hover:bg-primary rounded-md px-10 text-center mr-96 py-2 font-black text-2xl bg-white mt-10 cursor-pointer" onClick={openModal}>
                Registrar Gimnasio
            </div>
            <div className="bg-table mt-10 rounded-xl">
                <div className="text-white font-black ml-5 pt-10 text-xl">Mantenimiento de Gimnasios</div>
                <table className="table-auto w-full mt-5">
                    <thead>
                        <tr className='text-white'>
                            <th className="px-10 py-2">Gimnasio ID</th>
                            <th className="px-10 py-2">Distrito</th>
                            <th className="px-10 py-2">Dirección</th>
                            <th className="px-10 py-2">Nombre</th>
                            <th className="px-10 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gimnasios.map((gimnasio, index) => (
                            <tr className='text-center text-white' key={gimnasio.gymUuid}>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-textbutton hover:underline hover:bg-primary hover:text-white bg-white px-8 py-2 rounded-2xl"
                                        onClick={() => openGimnasioDetailsModal(gimnasio.gymUuid)}
                                    >
                                        {index + 1}
                                    </button>
                                </td>
                                <td className="border px-4 py-2">{gimnasio.district}</td>
                                <td className="border px-4 py-2">{gimnasio.direction}</td>
                                <td className="border px-4 py-2">{gimnasio.tradename}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-white text-textbutton hover:bg-primary hover:text-white rounded-2xl py-2 px-8"
                                        onClick={() => openEditModal(gimnasio.gymUuid)}
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
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary pb-2 px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl'>Registra la nueva Membresia</div>
                        <div className='text-primary font-bold text-4xl my-5'>Registro</div>
                        <div>Nombre Comercial</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Nombre Comercial"
                            value={tradename}
                            onChange={e => setTradename(e.target.value)}
                        />
                        <div>Distrito</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Distrito"
                            value={district}
                            onChange={e => setDistrict(e.target.value)}
                        />
                        <div>Descripción</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Descripción"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <div>Dirección</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Dirección"
                            value={direction}
                            onChange={e => setDirection(e.target.value)}
                        />
                        <button
                            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
                            onClick={handleRegister}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            )}
            {showGimnasioDetailsModal && selectedGimnasio && (
                <div className="fixed inset-0 flex items-center bg-black bg-opacity-50 ">
                    <div className="bg-white p-8 rounded-md shadow-md m-32">
                        <button
                            className="bg-primary text-white py-2 px-4 rounded border-4 border-primary hover:bg-primary-dark hover:text-primary hover:bg-white"
                            onClick={closeModal}
                        >
                            Atrás
                        </button>
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl mt-5'>{selectedGimnasio.tradename}</div>
                        <div className='text-primary font-bold text-4xl my-5'>Detalles</div>
                        <div>Distrito: {selectedGimnasio.district}</div>
                        <div>Descripción: {selectedGimnasio.description}</div>
                        <div>Direction: {selectedGimnasio.direction}</div>
                    </div>
                </div>
            )}
            {showEditModal && editingGimnasio && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md w-2/5">
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary pb-2 px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl'>Editar Gimnasio</div>
                        <div>Nombre Comercial</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Nombre Comercial"
                            value={editTradename}
                            onChange={e => setEditTradename(e.target.value)}
                        />
                        <div>Distrito</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Distrito"
                            value={editDistrict}
                            onChange={e => setEditDistrict(e.target.value)}
                        />
                        <div>Descripción</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Apellidos"
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                        />
                        <div>Dirección</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Dirección"
                            value={editDirection}
                            onChange={e => setEditDirection(e.target.value)}
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