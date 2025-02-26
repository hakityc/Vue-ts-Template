import type { AxiosError } from 'axios'

interface CmdError {
  isCmdError: true
  code: number
  data: any
  message: string
}

function isAxiosError(error: any): error is AxiosError {
  return error.config
}

function isCmdError(error: any): error is CmdError {
  return error.isCmdError
}

export function handleError(error: unknown) {
  if (isAxiosError(error)) {
    console.error('isAxiosError')
  }
  else if (isCmdError(error)) {
    console.error(error.message)
  }
  else {
    console.error(error)
  }
}
