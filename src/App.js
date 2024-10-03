import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import RightSidebar from './RightSidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios'; // Add Axios for HTTP requests

function App() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [components, setComponents] = useState([]);

    const updateComponent = (updatedComponent) => {
        setComponents((prevComponents) =>
            prevComponents.map((comp) =>
                comp.id === updatedComponent.id ? updatedComponent : comp
            )
        );
        setSelectedComponent(updatedComponent);
    };

    // Save layout to the backend
    const saveLayout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/save-layout', components);
            alert('Layout saved successfully!');
        } catch (error) {
            console.error('Error saving layout:', error);
            alert('Failed to save layout');
        }
    };

    // Load layout from the backend
    const loadLayout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/load-layout');
            setComponents(response.data);
        } catch (error) {
            console.error('Error loading layout:', error);
            alert('Failed to load layout');
        }
    };

    useEffect(() => {
        // Load the layout when the app starts
        loadLayout();
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar />
                <Canvas setSelectedComponent={setSelectedComponent} />
                <RightSidebar
                    selectedComponent={selectedComponent}
                    updateComponent={updateComponent}
                />
            </div>
            <button onClick={saveLayout} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px' }}>
                Save Layout
            </button>
            <button onClick={loadLayout} style={{ position: 'absolute', top: '60px', right: '20px', padding: '10px 20px' }}>
                Load Layout
            </button>
        </DndProvider>
    );
}

export default App;
