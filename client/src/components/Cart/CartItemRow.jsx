import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItemRow = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-6 px-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {item.image}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{item.unit}</p>
          </div>
        </div>
      </td>

      <td className="py-6 px-4 text-center">
        <p className="text-gray-900 font-medium">Rs.{item.price.toFixed(2)}</p>
      </td>

      <td className="py-6 px-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded hover:bg-gray-100"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-base font-medium text-gray-900 w-10 text-center border border-gray-300 rounded py-1">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </td>

      <td className="py-6 px-4 text-center">
        <p className="text-gray-900 font-semibold">Rs.{(item.price * item.quantity).toFixed(2)}</p>
      </td>

      <td className="py-6 px-4 text-center">
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;