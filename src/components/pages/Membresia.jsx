import { useEffect, useState } from 'react';
import axios from 'axios';

export const Membresia = () => {
    const [showModal, setShowModal] = useState(false);
    const [membresias, setMembresias] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [daysDuration, setDaysDuration] = useState('');

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

            closeModal();
        } catch (error) {
            console.error('Error al registrar membresía', error);
        }
    };
    return (
        <>
            <div className="text-primary font-black text-4xl">
                Membresias
            </div>
            <div className="text-primary rounded-md px-10 text-center mr-96 py-2 font-black text-2xl bg-white mt-10 cursor-pointer" onClick={openModal}>
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
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{membresia.name}</td>
                                <td className="border px-4 py-2">{membresia.price}</td>
                                <td className="border px-4 py-2">{membresia.daysDuration} días</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">
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
                        <button
                            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
                            onClick={handleRegister}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}