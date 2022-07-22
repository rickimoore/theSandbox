import React, {useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import useValidBeneficiary from '../../hooks/useValidBeneficiary';
import CreateAuction from '../../views/CreateAuction/CreateAuction';
import dynamic from 'next/dynamic';

const Modal = dynamic(
    () => import('antd').then(antd => antd.Modal),
    { ssr: false }
);

export default function Create () {
  const [isDismissed, setDismissed] = useState(false);
  const isBeneficiary = useValidBeneficiary();

  return (
      <div className="w-screen h-screen bg-sandMedium flex flex-col items-center justify-center">
        <Navbar/>
        <Modal visible={!isBeneficiary && !isDismissed}
            okButtonProps={{ hidden: true }}
               onCancel={() => setDismissed(true)}
          cancelButtonProps={{ hidden: true }}>
          <div className="mb-6 max-w-md">
            <h2>Opps...</h2>
            <p>It looks like you're not authorized to create an auction.
              You may not submit the form, however you can see what parameters are used to create an auction.</p>
          </div>
        </Modal>
        <CreateAuction/>
      </div>
  )
}