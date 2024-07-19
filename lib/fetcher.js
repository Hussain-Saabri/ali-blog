import React from 'react';
import useFetcher from './fetcher'; // Adjust the import path as needed

const MyComponent = () => {
    const { data, isLoading, isError } = useFetcher('some-endpoint');

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred</div>;

    return (
        <div>
            {/* Render your data here */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default MyComponent;
