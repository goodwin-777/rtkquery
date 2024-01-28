import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react'
import { GoTriangleLeft, GoTriangleDown } from "react-icons/go";

export default function ExpandablePanel({header, children, className}) {
    const[isOpen, setIsOpen] = useState(false);

    const classnames = classNames('border shadow bg-white rounded w-full p-3 ',className) ;

    const divEl = useRef();

    useEffect(()=>{
        const handler = (event)=>{
            if(!isOpen){
                return null;
            }
            if (!divEl.current) {
                return null;
            }
            if (!divEl.current.contains(event.target)) {
                console.log(divEl.current);
                console.log(event.target);
                setIsOpen(false);
            }
        }
        document.addEventListener('click',handler,true);

        return ()=>{
            document.removeEventListener('click',handler,true);
        }
    },[isOpen])
    
    const handleClick= ()=>{
        setIsOpen( !isOpen);
    }
    return (
        <div className={classnames} ref={divEl}>
            <div className='flex flex-row justify-between items-center'>
                {header}
                <div onClick={handleClick}>
                    {isOpen ? <GoTriangleDown className='text-4xl text-gray-600 cursor-pointer' /> : <GoTriangleLeft className='text-4xl text-gray-600 cursor-pointer'/>}
                </div>
            </div>
            {isOpen && children}
        </div>
    )
}
