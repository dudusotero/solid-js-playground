import type { CartItem } from '@/types'
import {
  createContext,
  createEffect,
  useContext,
  type ParentComponent,
} from 'solid-js'
import { createStore } from 'solid-js/store'

export type CartContextState = {
  readonly items: CartItem[]
  readonly size: number
  readonly total: number
}

export type CartContextValue = [
  state: CartContextState,
  actions: {
    clear: () => void
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
  }
]

const defaultState: CartContextState = {
  items: [],
  size: 0,
  total: 0,
}

const CartContext = createContext<CartContextValue>([
  defaultState,
  {
    clear: () => undefined,
    addItem: () => undefined,
    removeItem: () => undefined,
    increaseQuantity: () => undefined,
    decreaseQuantity: () => undefined,
  },
])

export const CartProvider: ParentComponent = (props) => {
  const [state, setState] = createStore({
    items: defaultState.items,
    size: defaultState.size,
    total: defaultState.total,
  })

  const clear = () => setState('items', [])

  const addItem = (item: CartItem) => {
    if (state.items.find((i) => i.id === item.id)) {
      return increaseQuantity(item.id)
    }
    setState('items', (items) => [...items, item])
  }

  const removeItem = (id: number) =>
    setState('items', (items) => items.filter((item) => item.id !== id))

  const increaseQuantity = (id: number) =>
    setState(
      'items',
      (item) => item.id === id,
      'quantity',
      (quantity) => quantity + 1
    )

  const decreaseQuantity = (id: number) => {
    if (state.items.find((item) => item.id === id)?.quantity === 1) {
      return removeItem(id)
    }
    setState(
      'items',
      (item) => item.id === id,
      'quantity',
      (quantity) => quantity - 1
    )
  }

  createEffect(() => {
    setState(
      'size',
      state.items.reduce<number>((acc, item) => acc + item.quantity, 0)
    )
    setState(
      'total',
      state.items.reduce<number>(
        (acc, item) => acc + item.quantity * item.price,
        0
      )
    )
  })

  return (
    <CartContext.Provider
      value={[
        state,
        { clear, addItem, removeItem, increaseQuantity, decreaseQuantity },
      ]}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
