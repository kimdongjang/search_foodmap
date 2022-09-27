import { ServerResponse } from 'http'
import { GetServerSidePropsContext } from 'next'
import { AnyAction, Store } from 'redux'
import { OurStore } from '../modules/store'

// This type contains context of the wrapper.getServerSideProps + State of our store.
export type ContextWithStore = Omit<
  GetServerSidePropsContext & {
    store: Store<OurStore, AnyAction>
  },
  'resolvedUrl'
>

// This type tells us how our callback function will look like.
// We will provide accessToken, store and server response to the callback
// But you can provide whatever you want.
export type Callback = (
  accessToken: string,
  store: Store<OurStore, AnyAction>,
  res: ServerResponse
) => Record<string, unknown> | Promise<Record<string, unknown>>

// General props type for our authorize function.
interface AuthorizeProps {
  context: ContextWithStore
  callback: Callback
}
