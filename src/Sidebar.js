import React from 'react';
import { useDrag } from 'react-dnd';

const SidebarItem = ({ name, type }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', border: '1px solid black', marginBottom: '5px', cursor: 'pointer' }}>
            {name}
        </div>
    );
};

const Sidebar = () => {
    return (
        <div style={{ padding: '20px', width: '200px', backgroundColor: '#f4f4f4' }}>
            <h4>Components</h4>
            <SidebarItem name="Header" type="header" />
            <SidebarItem name="Text Block" type="text" />
            <SidebarItem name="Image" type="image" />
        </div>
    );
};

export default Sidebar;
