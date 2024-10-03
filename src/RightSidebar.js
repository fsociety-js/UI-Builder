import React, { useState, useEffect } from 'react';

const RightSidebar = ({ selectedComponent, updateComponent }) => {
    const [properties, setProperties] = useState({
        text: '',
        color: '',
        fontSize: '',
        margin: '',
        padding: '',
        backgroundColor: '',
        textAlign: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (selectedComponent) {
            setProperties({
                text: selectedComponent.properties.text || '',
                color: selectedComponent.properties.color || '',
                fontSize: selectedComponent.properties.fontSize || '',
                margin: selectedComponent.properties.margin || '',
                padding: selectedComponent.properties.padding || '',
                backgroundColor: selectedComponent.properties.backgroundColor || '',
                textAlign: selectedComponent.properties.textAlign || 'left',
                imageUrl: selectedComponent.properties.imageUrl || '',
            });
        }
    }, [selectedComponent]);

    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        setProperties({ ...properties, [name]: value });
        updateComponent({ ...selectedComponent, properties: { ...properties, [name]: value } });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProperties({ ...properties, imageUrl: reader.result });
                updateComponent({ ...selectedComponent, properties: { ...properties, imageUrl: reader.result } });
            };
            reader.readAsDataURL(file);
        }
    };

    if (!selectedComponent) {
        return (
            <div style={{ padding: '20px', width: '200px', backgroundColor: '#f4f4f4' }}>
                <h4>Properties</h4>
                <p>Select a component to customize.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', width: '200px', backgroundColor: '#f4f4f4' }}>
            <h4>Customize Component</h4>

            {selectedComponent.type === 'header' || selectedComponent.type === 'text' ? (
                <>
                    <label>Text:</label>
                    <input
                        type="text"
                        name="text"
                        value={properties.text}
                        onChange={handlePropertyChange}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                </>
            ) : null}

            {selectedComponent.type === 'image' && (
                <>
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageUpload}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                </>
            )}

            <label>Color:</label>
            <input
                type="color"
                name="color"
                value={properties.color}
                onChange={handlePropertyChange}
                style={{ width: '100%', marginBottom: '10px' }}
            />

            <label>Font Size (px):</label>
            <input
                type="number"
                name="fontSize"
                value={properties.fontSize}
                onChange={handlePropertyChange}
                style={{ width: '100%', marginBottom: '10px' }}
            />

            <label>Margin (px):</label>
            <input
                type="number"
                name="margin"
                value={properties.margin}
                onChange={handlePropertyChange}
                style={{ width: '100%', marginBottom: '10px' }}
            />

            <label>Padding (px):</label>
            <input
                type="number"
                name="padding"
                value={properties.padding}
                onChange={handlePropertyChange}
                style={{ width: '100%', marginBottom: '10px' }}
            />

            <label>Background Color:</label>
            <input
                type="color"
                name="backgroundColor"
                value={properties.backgroundColor}
                onChange={handlePropertyChange}
                style={{ width: '100%', marginBottom: '10px' }}
            />

            <label>Text Align:</label>
            <select
                name="textAlign"
                value={properties.textAlign}
                onChange={handlePropertyChange}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
            </select>
        </div>
    );
};

export default RightSidebar;
