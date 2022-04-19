import React from "react";

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading}) => {
    return (
        <div>
            ЗАГРУЗКА!!!
        </div>
    );
};

export default Loader;