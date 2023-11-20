import MenuPoliciesTreeSelect from '@/components/configuration/MenuPoliciesTreeSelect'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'




const MenuPolicies = async () => {
  const branches = await APIHandlers.get('/api/core/branch-dropdown/')
  
  return (
    <div>
        <MenuPoliciesTreeSelect Branches={branches}/>
    </div>
  )
}

export default MenuPolicies