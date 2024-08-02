import React from 'react';

interface Props{
    children: React.ReactNode;
}

const AuthLayout = ({children}: Props) => {
    return (
        <div className="fex items-center justify-center h-screen">
            {children}
        </div>
    )
};

export default AuthLayout;