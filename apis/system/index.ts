import { httpGet } from '@/lib/services/request-client'
import type { SystemConstantResponse } from '@/domain/response/system'
import { SystemConfigStore } from '@/store/system'

export class SystemApi {
  static async fetchSystemConstant(): Promise<SystemConstantResponse> {
    const res = await httpGet<SystemConstantResponse>({ url: '/system/getConstantBySign' })
    const data = await SystemConfigStore.to.saveSystemConstant(res)
    return data
  }
}
