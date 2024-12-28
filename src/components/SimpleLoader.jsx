import './SimpleLoader.css';

function SimpleLoader({children}) {
    return (
        <>
        <div className='simple-loader'>
            <div><strong>{children}</strong></div>
            <div className='simple-loader__container'>
                <div className='simple-loader__loader'></div>
            </div>
        </div>
        </>
    )
}

export default SimpleLoader;