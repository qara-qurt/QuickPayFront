import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useActiveTab = (routeToTab: Record<string, number>) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(0)

    const tabToRoute: Record<number, string> = Object.fromEntries(
        Object.entries(routeToTab).map(([key, value]) => [value, key]),
    )

    useEffect(() => {
        const currentTab = routeToTab[location.pathname] || 0
        setActiveTab(currentTab)
    }, [location.pathname])

    const handleTabChange = (newValue: number) => {
        setActiveTab(newValue)
        const newRoute = tabToRoute[newValue]
        if (newRoute && newRoute !== location.pathname) {
            navigate(newRoute) // Меняем URL при смене таба
        }
    }

    return { activeTab, handleTabChange }
}
