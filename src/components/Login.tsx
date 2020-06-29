import React from 'react'

export default function Login() {
  return (
    <div className="Login">
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
