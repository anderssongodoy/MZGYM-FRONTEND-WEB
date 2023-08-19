import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdAccountCircle, MdCardMembership } from "react-icons/md";
import { AiFillHome } from "react-icons/ai"
import { CgGym } from "react-icons/cg"
import { FaUserGroup } from "react-icons/fa6"
import { IoAlertCircleSharp } from "react-icons/io5"
import { Link, Outlet } from "react-router-dom";

export const Sidebar = () => {
    const [open, setOpen] = useState(true);

    const menuItems = [
        { route: "home", title: "Home", icon: <AiFillHome/> },
        { route: "membresia", title: "Membresia", icon: <MdCardMembership/> },
        { route: "gimnasio", title: "Gimnasio", icon: <CgGym/> },
        { route: "cliente", title: "Cliente", icon: <FaUserGroup/> },
        { route: "notificacion", title: "Notificación", icon: <IoAlertCircleSharp/> }
    ]

    return (
        <div className="flex">
            <div
                className={`bg-primary p-5 pt-8 ${open ? "w-72" : "w-20"
                    } duration-300 relative min-h-screen`}
            >
                <BsArrowLeftShort
                    className={`bg-white text-primary text-3xl rounded-full absolute -right-3 top-9 border border-primary cursor-pointer ${!open && "rotate-180"
                        }`}
                    onClick={() => setOpen(!open)}
                />
                <div className="inline-flex">
                    <MdAccountCircle
                        className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"
                            }`}
                    >
                        Administrador
                    </h1>
                </div>
                <ul className="pt-10">
                    {menuItems.map((menu, index) => (
                        <>
                            <Link key={index} to={`/${menu.route}`} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer px-2 py-4 mt-10 -mr-5 hover:bg-secondary hover:text-primary rounded-l-lg`}>
                                <span className="text-2xl block float-left">
                                    {menu.icon}
                                </span>
                                <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{menu.title}</span>
                            </Link>
                        </>
                    ))}
                </ul>
            </div>
            <div className="p-7">
                <Outlet />
            </div>
        </div>
    );
}