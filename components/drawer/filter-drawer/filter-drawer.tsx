"use client"
import React from 'react'
import { StyledMobileDrawer } from '../drawer.style'

import { useOverlay } from '@/hooks/use-overlay'
import FilterCard from '@/components/card/filter-card/filter-card'
import { useFilterDrawer } from '@/hooks/use-filter-drawer'

const FilterDrawer = () => {
    const { filterDrawer, toggleDrawer } = useFilterDrawer()
    const { toggleOverlay } = useOverlay()

  
    return (
        <StyledMobileDrawer
            open={(filterDrawer as boolean) ?? false}
            onClose={() => {
                toggleDrawer(!filterDrawer)
                toggleOverlay(false)
            }}
            placement="bottom"
            height={"80%"}
            closeIcon={null}
            width={485}
            footer={null}
        >
            <FilterCard mobile />
        </StyledMobileDrawer>
    )
}

export default FilterDrawer
