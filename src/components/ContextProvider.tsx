import React, { FC, PropsWithChildren, useContext } from 'react'

export const GlobalContext = React.createContext({});

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const context = {}

  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextProvider

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a ContextProvider')
  }
  return context
}