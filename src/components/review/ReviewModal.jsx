import React, { useState } from "react";
import { Star, X, Loader2, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { createReviewApi } from "../../services/reviewService.js";

const ReviewModal = ({ trip, onClose, onSuccess }) => {
  const [rating, setRating] = useState(trip?.existing_rating || 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(trip?.existing_comment || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      return toast.error("Please write a short comment about your trip experience.");
    }

    const targetTripId = trip?.trip_id || trip?.id || trip?.tripId;
    if (!targetTripId) {
      return toast.error("Unable to identify Trip ID. Please refresh and try again.");
    }

    try {
      setSubmitting(true);
      const res = await createReviewApi(targetTripId, rating, comment);
      if (res.success) {
        toast.success(res.message || "Review submitted successfully!");
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(error.message || error.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  const getDestinationName = (dest) => {
    if (!dest) return "Expedition";
    if (typeof dest === "object") return dest.name || dest.city || "Expedition";
    return dest;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Rate Expedition
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {trip.trip_name || trip.name}
            </h3>
            <p className="text-xs text-slate-500">{getDestinationName(trip.destination)}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Star Picker */}
          <div className="text-center">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Overall Rating
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverRating || rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition transform hover:scale-125 cursor-pointer"
                  >
                    <Star
                      className={`w-9 h-9 ${
                        isFilled ? "fill-amber-400 text-amber-400" : "text-slate-200"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-bold text-amber-600 mt-2">
              {rating === 5 && "⭐ Excellent - Unforgettable Experience!"}
              {rating === 4 && "⭐ Very Good - Enjoyed it immensely!"}
              {rating === 3 && "⭐ Good - Average experience"}
              {rating === 2 && "⭐ Fair - Needs improvement"}
              {rating === 1 && "⭐ Poor - Disappointing"}
            </p>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Your Review & Feedback
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share highlights of the trip, host hospitality, scenery, or helpful tips for future travelers..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white resize-none transition"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
