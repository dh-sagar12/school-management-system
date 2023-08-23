import AdmissionConfirmPage from '@/components/Students/AdmissionConfirmPage';
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const Confirm = async ({ params }: { params: { slug: string } }) => {

  try {
    const admission_detail = await APIHandlers.get(`api/tran/admission/detail/${params.slug}`)
    const charges =  await APIHandlers.get('/api/academic/charges/0')
    console.log(admission_detail);
    return (
      <React.Fragment>
        <h2 className='text-xl font-bold text-blue-600 pb-3'>Confirm #{params.slug}</h2>

        <AdmissionConfirmPage slug={params.slug} AdmissionDetail={admission_detail}  Charges={charges}/>

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

export default Confirm