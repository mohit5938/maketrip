import React, { useEffect, useState } from "react";
import { Star, MessageSquare, Sparkles, User, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { getTripReviewsApi } from "../../services/reviewService.js";
import ReviewModal from "../review/ReviewModal.jsx";

const ReviewsSection = ({ trip }) => {
  const { user } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(5.0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [distribution, setDistribution] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (trip?.id) {
      fetchReviews();
    }
  }, [trip?.id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getTripReviewsApi(trip.id);
      if (res.success) {
        setReviews(res.reviews || []);
        setAvgRating(res.avgRating || 5.0);
        setTotalReviews(res.totalReviews || 0);
        if (res.distribution) setDistribution(res.distribution);
      }
    } catch (error) {
      console.warn("Fetch reviews warning:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Traveler Experiences
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
            Reviews & Rating ({totalReviews})
          </h2>
        </div>

        {user && (
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Write a Review
          </button>
        )}
      </div>

      {/* Summary & Rating Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        {/* Rating Score */}
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200/80 pb-4 md:pb-0 md:pr-6">
          <span className="text-5xl font-black text-slate-900">{avgRating}</span>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(avgRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            Based on {totalReviews} Verified Traveler {totalReviews === 1 ? "Review" : "Reviews"}
          </span>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-2 space-y-2 justify-center flex flex-col">
          {[5, 4, 3, 2, 1].map((starCount) => {
            const count = distribution[starCount] || 0;
            const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
            return (
              <div key={starCount} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-bold text-slate-600 shrink-0">{starCount} Stars</span>
                <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-slate-400 shrink-0">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="py-8 text-center text-slate-400 text-sm">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-sm">
          <MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-300" />
          No traveler reviews yet for this expedition. Be the first to leave a review!
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      rev.reviewer_photo ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.reviewer_name || "Traveler")}&background=ec4899&color=fff`
                    }
                    alt={rev.reviewer_name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.reviewer_name}</h4>
                    <span className="text-[11px] text-slate-400">{formatDate(rev.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/80">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-extrabold text-amber-700">{rev.rating}.0</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ReviewModal
          trip={trip}
          onClose={() => setShowModal(false)}
          onSuccess={fetchReviews}
        />
      )}
    </div>
  );
};

export default ReviewsSection;
