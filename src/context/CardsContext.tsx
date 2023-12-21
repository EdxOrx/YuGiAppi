import { createContext, useContext } from 'react';
import { IYuGiOhCard } from '../@types/types';

export const YuGiOhContext = createContext<IYuGiOhCard[]>([]);

export const useYuGiOhContext = () => useContext(YuGiOhContext)
