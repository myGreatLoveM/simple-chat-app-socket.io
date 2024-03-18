import { useEffect, useState } from 'react'
import useConversation from '../store/useConversation'
import toast from 'react-hot-toast'

function useGetMessages() {
  const [loading, setLoading] = useState()
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`)

        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setMessages(data.data)
      } catch (error) {
        toast.error(error.messages)
      } finally {
        setLoading(false)
      }
    }

    if (selectedConversation?._id) {
      getMessages()
    }

  }, [selectedConversation?._id])

  return { loading, messages }
}

export default useGetMessages
