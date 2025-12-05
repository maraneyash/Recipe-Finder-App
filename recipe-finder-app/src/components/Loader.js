import React from 'react';

const Loader = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
            <div className="pill" style={{ background: '#fff' }}>Loading...</div>
        </div>
    );
};

export default Loader;
