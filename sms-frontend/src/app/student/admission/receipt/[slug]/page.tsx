import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const PrintReceipt = async ({ params }: { params: { slug: string } }) => {

    try {
        const receipt_detail = await APIHandlers.get(`api/tran/print-receipt/29`)
        console.log(receipt_detail);

        return (
            <React.Fragment>
                <div dangerouslySetInnerHTML={{ __html: receipt_detail }} ></div>
            </React.Fragment>
        )


    } catch (error) {
        console.log(error);
        return (
            <React.Fragment>
                <p className='text-center'>Page Not Found</p>
            </React.Fragment>
        )

    }

}

export default PrintReceipt