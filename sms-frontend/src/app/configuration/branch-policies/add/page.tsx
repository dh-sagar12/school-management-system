import BranchPolicyForm from '@/components/configuration/BranchPolicyForm'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const BranchPolicy = async () => {
  const branches = await APIHandlers.get('/api/core/branch-dropdown/')

  return (
    <>
      <BranchPolicyForm Branches={branches}/>
    </>
  )
}

export default BranchPolicy