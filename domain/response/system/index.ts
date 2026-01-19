export type ConstantItem = { value: number | string; text: string }

export interface SystemConstantList {
  CALLBACK_STATUS: ConstantItem[]
  RISK_LIMIT_STATUS: ConstantItem[]
  TRANSACTION_STATUS_TRU: ConstantItem[]
  RISK_LIMIT_TRANSACTION_TYPE: ConstantItem[]
  TRANSACTION_STATUS_WAAS: ConstantItem[]
  JOIN_RECORD_STATUS: ConstantItem[]
  STRATEGY_RECIPIENT_TYPE: ConstantItem[]
  STRATEGY_LIMIT_TYPE: ConstantItem[]
  LOG_CALLBACK_STATUS: ConstantItem[]
  STRATEGY_STATUS: ConstantItem[]
  RISK_LIMIT_TYPE: ConstantItem[]
  TRANSACTION_TYPE_TRU: ConstantItem[]
  REQUEST_LOG_RESPONSE_STATUS: ConstantItem[]
  BUSINESS_TYPE_TRU: ConstantItem[]
  STRATEGY_LOG_ACTION: ConstantItem[]
  SEND_STATUS: ConstantItem[]
  WHITE_LIST_TYPE: ConstantItem[]
  MESSAGE_TYPE: ConstantItem[]
  STRATEGY_TRANSACTION_TYPE: ConstantItem[]
  MESSAGE_STATUS: ConstantItem[]
  AUDIT_TYPE: ConstantItem[]
  TEAM_RISK_STRATEGY_TYPE: ConstantItem[]
  TRANSACTION_RISK_STRATEGY_TYPE: ConstantItem[]
  STRATEGY_LOG_TYPE: ConstantItem[]
  AUDIT_STATUS: ConstantItem[]
  READ_STATUS: ConstantItem[]
  WEBHOOK_STATUS: ConstantItem[]
}

export interface SystemConstantMap {
  CALLBACK_STATUS: Record<string, string>
  RISK_LIMIT_STATUS: Record<string, string>
  TRANSACTION_STATUS_TRU: Record<string, string>
  RISK_LIMIT_TRANSACTION_TYPE: Record<string, string>
  TRANSACTION_STATUS_WAAS: Record<string, string>
  JOIN_RECORD_STATUS: Record<string, string>
  STRATEGY_RECIPIENT_TYPE: Record<string, string>
  STRATEGY_LIMIT_TYPE: Record<string, string>
  LOG_CALLBACK_STATUS: Record<string, string>
  STRATEGY_STATUS: Record<string, string>
  RISK_LIMIT_TYPE: Record<string, string>
  TRANSACTION_TYPE_TRU: Record<string, string>
  REQUEST_LOG_RESPONSE_STATUS: Record<string, string>
  BUSINESS_TYPE_TRU: Record<string, string>
  STRATEGY_LOG_ACTION: Record<string, string>
  SEND_STATUS: Record<string, string>
  WHITE_LIST_TYPE: Record<string, string>
  MESSAGE_TYPE: Record<string, string>
  STRATEGY_TRANSACTION_TYPE: Record<string, string>
  MESSAGE_STATUS: Record<string, string>
  AUDIT_TYPE: Record<string, string>
  TEAM_RISK_STRATEGY_TYPE: Record<string, string>
  TRANSACTION_RISK_STRATEGY_TYPE: Record<string, string>
  STRATEGY_LOG_TYPE: Record<string, string>
  AUDIT_STATUS: Record<string, string>
  READ_STATUS: Record<string, string>
  WEBHOOK_STATUS: Record<string, string>
}

export type SystemConstantKey = keyof SystemConstantList

export interface SystemConstantResponse {
  listConstant: SystemConstantList
  mapConstant: SystemConstantMap
  empty: boolean
}
