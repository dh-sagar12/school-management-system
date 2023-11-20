import BranchPolicyHome from '@/components/configuration/BranchPolicyHome'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const BranchPolicyPage = async () => {
  const branches = await APIHandlers.get('/api/core/branch-dropdown/')

  return (
    <>
      <BranchPolicyHome />
    </>
  )
}

export default BranchPolicyPage