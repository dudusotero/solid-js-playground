import { For, type Component } from 'solid-js'
import Counter from './components/Counter'
import { useCart } from './contexts/cart'
import { useCounter } from './contexts/counter'

const App: Component = () => {
  const [counter, { start, stop, setCount }] = useCounter()
  const [
    cart,
    { clear, addItem, removeItem, increaseQuantity, decreaseQuantity },
  ] = useCart()

  return (
    <div class="grid gap-4 p-4">
      <h1 class="text-3xl font-bold">Solid.js</h1>
      <div class="grid gap-4 border-t-2 border-black py-4 dark:border-white">
        {counter.count}
        <div class="flex flex-wrap gap-4">
          <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={start}
          >
            Start
          </button>
          <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={stop}
          >
            Stop
          </button>
        </div>
        <div class="flex flex-wrap gap-4">
          <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setCount(counter.count + 1)}
          >
            Increment
          </button>
          <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setCount(counter.count - 1)}
          >
            Decrement
          </button>
        </div>
      </div>
      <div class="grid gap-4 border-t-2 border-black py-4 dark:border-white">
        <div class="flex flex-wrap gap-4">
          <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() =>
              addItem({
                id: Date.now(),
                name: 'Item',
                price: 10,
                quantity: 1,
                description: 'Description',
                image: 'https://picsum.photos/200',
              })
            }
          >
            Add Item
          </button>
          <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={clear}
          >
            Clear Cart
          </button>
        </div>
        <div class="flex flex-wrap gap-4">
          <For each={cart.items}>
            {(item) => (
              <div class="flex flex-wrap gap-4 rounded border-2 border-black p-4 dark:border-white">
                <button
                  class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() => increaseQuantity(item.id)}
                >
                  <span class="sr-only">Increase quantity</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
                <button
                  class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <span class="sr-only">Decrease quantity</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 12H6"
                    />
                  </svg>
                </button>
                <div class="flex flex-wrap gap-4">
                  <div class="flex flex-wrap gap-4">
                    <img
                      class="h-32 w-32 object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                </div>
                <button
                  class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() => removeItem(item.id)}
                >
                  <span class="sr-only">Remove item from cart</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6l2 18h14l2-18H3z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </For>
        </div>
        <div class="grid gap-4">
          <p class="text-xl font-bold">
            Total:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(cart.total)}
          </p>
          <p class="text-lg font-bold">Size: {cart.size}</p>
        </div>
      </div>
      <div class="grid gap-4 border-t-2 border-black py-4 dark:border-white">
        <Counter initialCount={5} />
      </div>
    </div>
  )
}

export default App
