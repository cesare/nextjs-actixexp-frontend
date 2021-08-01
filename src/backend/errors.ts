interface Error {
  type: string,
}

class NotFound implements Error {
  type = 'not-found' as const
}

export default Error
export { NotFound }
