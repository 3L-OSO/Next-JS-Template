export const getDatabaseURL = (): string => {
  const dbName = process.env.DB_NAME
  const dbUser = process.env.DB_USER
  const dbPassword = process.env.DB_PASSWORD
  const dbHost = process.env.DB_HOST
  const dbPort = process.env.DB_PORT

  if (!dbName || !dbUser || !dbPassword || !dbHost || !dbPort)
    throw new Error('Database environment variables are not properly set.')

  return `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
}
