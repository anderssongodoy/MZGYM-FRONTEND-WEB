import axios from "axios";
import { useEffect, useState } from "react";

export const Gimnasio = () => {
    const [showModal, setShowModal] = useState(false);
    const [gimnasios, setGimnasios] = useState([]);
    const [tradename, setTradename] = useState('');
    const [district, setDistrict] = useState('');
    const [description, setDescription] = useState('');
    const [direction, setDirection] = useState('');

    useEffect(() => {
        async function fetchMembresias() {
            try {
                const response = await axios.get('https://mzgym2-production.up.railway.app/api/gym/list');
                setGimnasios(response.data);
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
            const response = await axios.post('https://mzgym2-production.up.railway.app/api/gym/create', {
                tradename,
                district,
                description,
                direction
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
                Gimnasios
            </div>
            <div className="text-primary rounded-md px-10 text-center mr-96 py-2 font-black text-2xl bg-white mt-10 cursor-pointer" onClick={openModal}>
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
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{gimnasio.district}</td>
                                <td className="border px-4 py-2">{gimnasio.direction}</td>
                                <td className="border px-4 py-2">{gimnasio.tradename}</td>
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
        </>
    )
}