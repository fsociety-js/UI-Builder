import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const Canvas = ({ setSelectedComponent }) => {
    const [components, setComponents] = useState([]);

    const [{ isOver }, drop] = useDrop({
        accept: 'component',
        drop: (item) => addComponent(item.type),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const addComponent = (type) => {
        setComponents((prev) => [...prev, { id: Date.now(), type, properties: {} }]);
    };

    const handleComponentClick = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div ref={drop} style={{ width: '100%', height: '100vh', padding: '20px', backgroundColor: isOver ? '#fafafa' : '#fff', border: '2px dashed #ccc' }}>
            <h4>Canvas</h4>
            {components.map((comp) => (
                <div
                    key={comp.id}
                    style={{
                        margin: comp.properties.margin || '0px',
                        padding: comp.properties.padding || '0px',
                        backgroundColor: comp.properties.backgroundColor || 'transparent',
                        cursor: 'pointer',
                        border: '1px solid #ddd',
                        padding: '10px',
                    }}
                    onClick={() => handleComponentClick(comp)}
                >
                    {comp.type === 'header' && (
                        <h1 style={{ color: comp.properties.color, fontSize: `${comp.properties.fontSize}px`, textAlign: comp.properties.textAlign }}>
                            {comp.properties.text || 'Header Component'}
                        </h1>
                    )}
                    {comp.type === 'text' && (
                        <p style={{ color: comp.properties.color, fontSize: `${comp.properties.fontSize}px`, textAlign: comp.properties.textAlign }}>
                            {comp.properties.text || 'This is a text block.'}
                        </p>
                    )}
                    {comp.type === 'image' && (
                        <img
                            src={comp.properties.imageUrl || 'https://via.placeholder.com/150'}
                            alt="uploaded"
                            style={{
                                width: '100%',
                                height: 'auto',
                                margin: comp.properties.margin,
                                padding: comp.properties.padding,
                                backgroundColor: comp.properties.backgroundColor,
                            }}
                        />
                    )}
                </div>
            ))}
            {isOver && <p>Drop here</p>}
        </div>
    );
};

export default Canvas;
