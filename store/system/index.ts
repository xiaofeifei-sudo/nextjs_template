'use client'

import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
import type { SystemConstantResponse } from '@/domain/response/system'
import constantsJson from '@/store/system/data/system_constant.json'
import { createComputed } from 'zustand-computed'

const KEY = 'system_constant'

type SystemConfigState = {
  data: SystemConstantResponse | null
  saveSystemConstant: (data: SystemConstantResponse) => SystemConstantResponse
  getSystemConstant: () => SystemConstantResponse | null
}

const DEFAULT_SYSTEM_CONSTANT = constantsJson as SystemConstantResponse

type SystemConfigComputed = {
  hasData: boolean
  getListByKey: (
    key: keyof SystemConstantResponse['listConstant'],
  ) => { value: number | string; text: string }[]
  getMapByKey: (key: keyof SystemConstantResponse['mapConstant']) => Record<string, string>
  callbackStatusList: { value: number | string; text: string }[]
  callbackStatusMap: Record<string, string>
}

const computed = createComputed<SystemConfigState, SystemConfigComputed>(
  (state: SystemConfigState): SystemConfigComputed => ({
    hasData: !!state.data && !state.data.empty,
    getListByKey: (key) => state.data?.listConstant[key] ?? [],
    getMapByKey: (key) => state.data?.mapConstant[key] ?? {},
    callbackStatusList: state.data?.listConstant.CALLBACK_STATUS ?? [],
    callbackStatusMap: state.data?.mapConstant.CALLBACK_STATUS ?? {},
  }),
  { keys: ['data'] },
)

const systemCreator: StateCreator<SystemConfigState> = (set, get) => ({
  data: DEFAULT_SYSTEM_CONSTANT,
  saveSystemConstant: (data: SystemConstantResponse) => {
    set({ data })
    return data
  },
  getSystemConstant: () => get().data,
})

export const useSystemConfigStore = create<SystemConfigState>()(
  devtools(
    persist(
      computed(systemCreator),
      {
        name: KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ data: state.data }),
      },
    ),
    { name: 'SystemConfigStore' },
  ),
)

export class SystemConfigStore {
  static to = {
    saveSystemConstant: (data: SystemConstantResponse) =>
      useSystemConfigStore.getState().saveSystemConstant(data),
    getSystemConstant: () => useSystemConfigStore.getState().getSystemConstant(),
  }
}
