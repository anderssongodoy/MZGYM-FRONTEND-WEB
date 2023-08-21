import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const Cliente = () => {
    const [showModal, setShowModal] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [showClienteDetailsModal, setShowClienteDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCliente, setEditingCliente] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editName, setEditName] = useState('');
    const [editLastname, setEditLastname] = useState('');
    const [editDocumentNumber, setEditDocumentNumber] = useState('');

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await axios.get('https://mzgym2-production.up.railway.app/api/customer/list');
                setClientes(response.data);
            } catch (error) {
                console.error('Error al obtener clientes', error);
            }
        }
        fetchClientes();
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowClienteDetailsModal(false);
        setShowEditModal(false)
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://mzgym2-production.up.railway.app/api/authentication/register', {
                email,
                name,
                lastname,
                documentNumber
            });

            console.log(response.data);
            toast.success('Cliente registrado exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al registrar cliente', error);
            toast.error('Error al registrar cliente');
        }
    };

    const openClienteDetailsModal = async (accountUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/customer/findbyid/${accountUuid}`);
            const clienteDetails = response.data;
            setSelectedCliente(clienteDetails);
            setShowClienteDetailsModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de cliente', error);
        }
    };

    const openEditModal = async (accountUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/customer/findbyid/${accountUuid}`);
            const clienteDetails = response.data;
            setEditingCliente(clienteDetails);
            setEditEmail(clienteDetails.email);
            setEditName(clienteDetails.name);
            setEditLastname(clienteDetails.lastName);
            setEditDocumentNumber(clienteDetails.documentNumber);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de cliente para editar', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://mzgym2-production.up.railway.app/api/customer/update/${editingCliente.accountUuid}`, {
                email: editEmail,
                name: editName,
                lastName: editLastname,
                documentNumber: editDocumentNumber,
            });

            console.log(response.data);
            toast.success('Cliente actualizado exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al actualizar cliente', error);
            toast.error('Error al actualizar cliente');
        }
    };

    return (
        <>
            <Toaster />
            <div className="text-primary font-black text-4xl">
                Clientes
            </div>
            <div className="text-primary hover:text-white hover:bg-primary rounded-md px-10 text-center mr-96 py-2 font-black text-2xl bg-white mt-10 cursor-pointer" onClick={openModal}>
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
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-textbutton hover:underline hover:bg-primary hover:text-white bg-white px-8 py-2 rounded-2xl"
                                        onClick={() => openClienteDetailsModal(cliente.accountUuid)}
                                    >
                                        {index + 1}
                                    </button>
                                </td>
                                <td className="border px-4 py-2">{cliente.name}</td>
                                <td className="border px-4 py-2">{cliente.lastName}</td>
                                <td className="border px-4 py-2">{cliente.email}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-white text-textbutton hover:bg-primary hover:text-white rounded-2xl py-2 px-8"
                                        onClick={() => openEditModal(cliente.accountUuid)}
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
                        <div className='text-title font-bold text-4xl'>Registra la nueva Cliente</div>
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
            {showClienteDetailsModal && selectedCliente && (
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
                        <div className='text-title font-bold text-4xl mt-5'>{selectedCliente.name}</div>
                        <div className='text-primary font-bold text-4xl my-5'>Detalles</div>
                        <div>Email: {selectedCliente.email}</div>
                        <div>Apellidos: {selectedCliente.lastName}</div>
                        <div>DNI: {selectedCliente.documentNumber}</div>
                    </div>
                </div>
            )}
            {showEditModal && editingCliente && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md w-2/5">
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary pb-2 px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl'>Editar Cliente</div>
                        <div>Email</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Email"
                            value={editEmail}
                            onChange={e => setEditEmail(e.target.value)}
                        />
                        <div>Nombre</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Nombre"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                        />
                        <div>Apellidos</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Apellidos"
                            value={editLastname}
                            onChange={e => setEditLastname(e.target.value)}
                        />
                        <div>DNI</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="DNI"
                            value={editDocumentNumber}
                            onChange={e => setEditDocumentNumber(e.target.value)}
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