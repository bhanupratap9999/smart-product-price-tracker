"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;

    setDeleting(true);
    await deleteProduct(product.id);
  };

  return (
    <Card className="group overflow-hidden border-gray-200/50 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex gap-5">
          {product.image_url && (
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image_url}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-2xl border border-gray-100 dark:border-gray-800 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white p-1.5 rounded-full shadow-lg group-hover:rotate-12 transition-transform">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 text-lg leading-snug group-hover:text-orange-600 transition-colors">
                {product.name}
              </h3>
            </div>

            <div className="flex items-end justify-between mt-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Price</span>
                <span className="text-3xl font-black text-orange-500">
                  {product.currency} {product.current_price}
                </span>
              </div>
              <Badge variant="secondary" className="bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                Live Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className={`flex-1 gap-2 rounded-xl border-gray-200 dark:border-gray-800 transition-all duration-300 ${showChart ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' : 'hover:border-orange-500/50 hover:text-orange-500'}`}
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="font-bold uppercase text-[10px] tracking-widest">Close Chart</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="font-bold uppercase text-[10px] tracking-widest">History</span>
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" asChild className="flex-1 gap-2 rounded-xl border-gray-200 dark:border-gray-800 hover:border-blue-500/50 hover:text-blue-500 transition-all duration-300">
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              <span className="font-bold uppercase text-[10px] tracking-widest">Store</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="w-10 px-0 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>

      {showChart && (
        <CardFooter className="pt-0 pb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <PriceChart productId={product.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
