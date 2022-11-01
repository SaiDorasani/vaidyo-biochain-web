import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Redirect } from 'react-router';

const ScanBioid = (props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            console.log(result);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
      {/* {window.location.href = {data}} */}
      {data == "No result"? 'No Result': <Redirect to={data} />}
      {/* {data == "No result"? 'No Result': window.location.href = {data}} */}
      
    </>
  );
};

export default ScanBioid;