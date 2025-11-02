import React from "react";
import { Truck, ShoppingBasket, Headphones } from "lucide-react";

export default function DeliveryBanner() {
  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 ">
          {/* Free Delivery */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 border-2 border-red-500 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Delivery</h3>
              <p className="text-gray-600">To Your Door</p>
            </div>
          </div>

          {/* Local Pickup */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 flex items-center justify-center">
                <ShoppingBasket className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Local Pickup
              </h3>
              <p className="text-gray-600">
                Check Out{" "}
                <a href="#" className="underline hover:text-red-500">
                  Locations
                </a>
              </p>
            </div>
          </div>

          {/* Available for You */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 border-2 border-red-500 rounded-full flex items-center justify-center">
                <Headphones className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Available for You
              </h3>
              <p className="text-gray-600">
                <a href="#" className="underline hover:text-red-500">
                  Online Support
                </a>{" "}
                24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}