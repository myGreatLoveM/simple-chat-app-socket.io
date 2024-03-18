import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'
import Conversation from './Conversation'

const Conversations = () => {
  const { conversations } = useGetConversations()

  return (
    <div className='py-2 flex flex-col overflow-auto gap-2'>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversation.length - 1}
        />
      ))}
    </div>
  )
}
export default Conversations
