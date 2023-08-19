import axios from "axios";
import { useEffect, useState } from "react";

export const Cliente = () => {
    const [showModal, setShowModal] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');

    useEffect(() => {
        async function fetchMembresias() {
            try {
                const response = await axios.get('https://mzgym2-production.up.railway.app/api/customer/list');
                setClientes(response.data);
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
            const response = await axios.post('https://mzgym2-production.up.railway.app/api/customer/create', {
                email,
                name,
                lastname,
                documentNumber
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
                Clientes
            </div>
            <div className="text-primary rounded-md px-10 text-center mr-96 py-2 font-black text-2xl bg-white mt-10 cursor-pointer" onClick={openModal}>
                Registrar Cliente
            </div>
            <div className="bg-table mt-10 rounded-xl">
                <div className="text-white font-black ml-5 pt-10 text-xl">Mantenimiento de Clientes</div>
                <table className="table-auto w-full mt-5">
                    <thead>
                        <tr className='text-white'>
                            <th className="px-10 py-2">Cliente ID</th>
                            <th className="px-10 py-2">Nombre</th>
                            <th className="px-10 py-2">Apellidos</th>
                            <th className="px-10 py-2">Email</th>
                            <th className="px-10 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr className='text-center text-white' key={cliente.accountUuid}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{cliente.name}</td>
                                <td className="border px-4 py-2">{cliente.lastName}</td>
                                <td className="border px-4 py-2">{cliente.email}</td>
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
                        <div>Email</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div>Nombre</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div>Apellidos</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Apellidos"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                        />
                        <div>DNI</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="DNI"
                            value={documentNumber}
                            onChange={e => setDocumentNumber(e.target.value)}
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