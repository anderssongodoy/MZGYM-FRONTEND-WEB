import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export const Notificacion = () => {
    const [showModal, setShowModal] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const [selectedNotificacion, setSelectedNotificacion] = useState(null);
    const [showNotificacionDetailsModal, setShowNotificacionDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingNotificacion, setEditingNotificacion] = useState(null);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editMessage, setEditMessage] = useState('');

    useEffect(() => {
        async function fetchNotificaciones() {
            try {
                const response = await axios.get('https://mzgym2-production.up.railway.app/api/notification/list');
                setNotificaciones(response.data);
            } catch (error) {
                console.error('Error al obtener notificaciones', error);
            }
        }
        fetchNotificaciones();
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowNotificacionDetailsModal(false);
        setShowEditModal(false)
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://mzgym2-production.up.railway.app/api/notification/create', {
                title,
                message,
            });

            console.log(response.data);
            toast.success('Notificacion registrado exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al registrar notificacion', error);
            toast.error('Error al registrar notificacion');
        }
    };

    const openNotificacionDetailsModal = async (notificationUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/notification/findbyid/${notificationUuid}`);
            const notificacionDetails = response.data;
            setSelectedNotificacion(notificacionDetails);
            setShowNotificacionDetailsModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de notificacion', error);
        }
    };

    const openEditModal = async (notificationUuid) => {
        try {
            const response = await axios.get(`https://mzgym2-production.up.railway.app/api/notification/findbyid/${notificationUuid}`);
            const notificacionDetails = response.data;
            setEditingNotificacion(notificacionDetails);
            setEditTitle(notificacionDetails.title);
            setEditMessage(notificacionDetails.message);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error al obtener detalles de notificacion para editar', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://mzgym2-production.up.railway.app/api/notification/update/${editingNotificacion.notificationUuid}`, {
                title,
                message
            });

            console.log(response.data);
            toast.success('Notificacion actualizado exitosamente');

            closeModal();
        } catch (error) {
            console.error('Error al actualizar notificacion', error);
            toast.error('Error al actualizar notificacion');
        }
    };


    return (
        <>
            <Toaster />
            <div className="text-primary font-black text-4xl">
                Notificaciones
            </div>
            <div className="text-primary hover:text-white hover:bg-primary rounded-md px-10 text-center mr-96 py-2 font-black text-2xl bg-white mt-10 cursor-pointer" onClick={openModal}>
                Registrar Notificacion
            </div>
            <div className="bg-table mt-10 rounded-xl">
                <div className="text-white font-black ml-5 pt-10 text-xl">Mantenimiento de Notificaciones</div>
                <table className="table-auto w-full mt-5">
                    <thead>
                        <tr className='text-white'>
                            <th className="px-10 py-2">Notificacion ID</th>
                            <th className="px-10 py-2">Título</th>
                            <th className="px-10 py-2">Mensaje</th>
                            <th className="px-10 py-2">Fecha Creada</th>
                            <th className="px-10 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notificaciones.map((notificacion, index) => (
                            <tr className='text-center text-white' key={notificacion.notificationUuid}>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-textbutton hover:underline hover:bg-primary hover:text-white bg-white px-8 py-2 rounded-2xl"
                                        onClick={() => openNotificacionDetailsModal(notificacion.notificationUuid)}
                                    >
                                        {index + 1}
                                    </button>
                                </td>
                                <td className="border px-4 py-2">{notificacion.title}</td>
                                <td className="border px-4 py-2">{notificacion.message}</td>
                                <td className="border px-4 py-2">{notificacion.createdDate}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-white text-textbutton hover:bg-primary hover:text-white rounded-2xl py-2 px-8"
                                        onClick={() => openEditModal(notificacion.notificationUuid)}
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
                        <div className='text-title font-bold text-4xl'>Registra la nueva Notificacion</div>
                        <div className='text-primary font-bold text-4xl my-5'>Registro</div>
                        <div>Titulo</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Titulo"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <div>Mensaje</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Mensaje"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
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
            {showNotificacionDetailsModal && selectedNotificacion && (
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
                        <div className='text-title font-bold text-4xl mt-5'>{selectedNotificacion.title}</div>
                        <div className='text-primary font-bold text-4xl my-5'>Detalles</div>
                        <div>Descripción: {selectedNotificacion.message}</div>
                    </div>
                </div>
            )}
            {showEditModal && editingNotificacion && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <span className="close absolute top-2 right-2 cursor-pointer bg-primary pb-2 px-5 text-4xl text-secondary" onClick={closeModal}>
                            &times;
                        </span>
                        <div className='text-title font-bold text-4xl'>Editar Notificacion</div>
                        <div>Titulo</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Titulo"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                        />
                        <div>Message</div>
                        <input
                            className="w-full border rounded p-2 mb-4"
                            type="text"
                            placeholder="Mensaje"
                            value={editMessage}
                            onChange={e => setEditMessage(e.target.value)}
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