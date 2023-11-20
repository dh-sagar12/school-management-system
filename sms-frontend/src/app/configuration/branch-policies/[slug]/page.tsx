import BranchPolicyForm from '@/components/configuration/BranchPolicyForm'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const BranchPoliciesDetail = async ({ params }: { params: { slug: string } }) => {

  const branches = await APIHandlers.get('/api/core/branch-dropdown/')

  return (
    <BranchPolicyForm Branches={branches} slug={params.slug} />
  )
}

export default BranchPoliciesDetail