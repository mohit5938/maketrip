import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import {
  MessageSquare,
  Send,
  Lock,
  Megaphone,
  Trash2,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Loader2
} from "lucide-react";
import { openAuthModal } from "../../redux/reducers/auth.js";
import {
  checkTripAccessApi,
  getTripDiscussionsApi,
  postDiscussionMessageApi,
  deleteDiscussionMessageApi
} from "../../services/discussionService.js";

const TripDiscussionBoard = ({ trip }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [discussions, setDiscussions] = useState([]);
  const [access, setAccess] = useState({ hasAccess: false, role: null });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [sending, setSending] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (trip?.id) {
      initBoard();
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leave_room", { tripId: trip?.id });
        socketRef.current.disconnect();
      }
    };
  }, [trip?.id, user]);

  const initBoard = async () => {
    try {
      setLoading(true);
      // 1. Fetch existing discussions
      const res = await getTripDiscussionsApi(trip.id);
      if (res.success) {
        setDiscussions(res.discussions || []);
      }

      // 2. Check access permissions
      if (user) {
        const accessRes = await checkTripAccessApi(trip.id);
        setAccess(accessRes);

        // 3. Connect to WebSocket room if traveler joined or is host
        if (accessRes.hasAccess) {
          const socket = io("http://localhost:5000", { withCredentials: true });
          socketRef.current = socket;

          socket.emit("join_room", { tripId: trip.id, userId: user.id });

          socket.on("receive_message", (newMsg) => {
            setDiscussions((prev) => {
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
            scrollToBottom();
          });

          socket.on("delete_message", ({ messageId }) => {
            setDiscussions((prev) => prev.filter((m) => m.id !== messageId));
          });
        }
      } else {
        setAccess({ hasAccess: false, role: null });
      }
    } catch (error) {
      console.warn("Init board warning:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!user) {
      dispatch(openAuthModal());
      return;
    }

    if (!access.hasAccess) {
      toast.info("Only joined travelers with confirmed bookings can post in live chat.");
      return;
    }

    try {
      setSending(true);
      const res = await postDiscussionMessageApi(trip.id, message, isAnnouncement);
      if (res.success) {
        setMessage("");
        setIsAnnouncement(false);
        // Message is appended automatically via Socket.io broadcast
      }
    } catch (error) {
      toast.error(error.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (msgId) => {
    try {
      const res = await deleteDiscussionMessageApi(msgId);
      if (res.success) {
        toast.info("Message deleted.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete message.");
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-md">
            <MessageSquare size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> WebSocket Live Room Chat
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-0.5">
              Expedition Group Chat & Q&A
            </h2>
          </div>
        </div>

        {access.hasAccess && (
          <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Room Joined
          </span>
        )}
      </div>

      {/* Access Denied Banner for Unjoined Travelers */}
      {!access.hasAccess && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-pink-400" /> Room Access Restricted
            </span>
            <h3 className="font-bold text-sm sm:text-base">
              Only joined travelers & host can chat in this live room
            </h3>
            <p className="text-xs text-slate-300">
              Reserve your spot on this expedition to unlock live group chat, host announcements, and packing coordination!
            </p>
          </div>

          <button
            onClick={() => {
              if (!user) {
                dispatch(openAuthModal());
              } else {
                navigate(`/join-trip/${trip?.id}`);
              }
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            Join Expedition <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Discussion Feed */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-100 p-4 sm:p-6 min-h-[250px] max-h-[450px] overflow-y-auto space-y-4">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs font-semibold">
            <Loader2 className="w-6 h-6 animate-spin text-pink-600 mb-2" />
            Loading discussion room...
          </div>
        ) : discussions.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No discussions or announcements yet. Be the first to start the group conversation!
          </div>
        ) : (
          discussions.map((msg) => {
            const isMe = user && String(msg.userId) === String(user.id);
            const isMsgHost = msg.userRole === "host";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isAnnouncement ? "w-full" : isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <img
                  src={
                    msg.userPhoto ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.userName)}&background=6366f1&color=fff`
                  }
                  alt={msg.userName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200 mt-1"
                />

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-1.5 shadow-2xs text-xs ${
                    msg.isAnnouncement
                      ? "w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-400 text-amber-950"
                      : isMe
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold ${msg.isAnnouncement ? "text-amber-900 font-extrabold" : isMe ? "text-pink-300" : "text-slate-900"}`}>
                        {msg.userName}
                      </span>

                      {isMsgHost && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full border border-purple-200">
                          Host
                        </span>
                      )}

                      {msg.isAnnouncement && (
                        <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-extrabold rounded-full flex items-center gap-1 uppercase tracking-wider">
                          <Megaphone className="w-3 h-3" /> Announcement
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] ${isMe ? "text-slate-400" : "text-slate-400"}`}>
                        {formatTime(msg.createdAt)}
                      </span>

                      {(isMe || access.role === "host" || access.role === "admin") && (
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="text-slate-400 hover:text-rose-500 transition cursor-pointer p-0.5"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar (Joined Travelers & Host Only) */}
      {access.hasAccess ? (
        <form onSubmit={handleSend} className="space-y-3">
          {access.role === "host" && (
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnnouncement}
                onChange={(e) => setIsAnnouncement(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <Megaphone className="w-3.5 h-3.5 text-amber-600" /> Post as Important Host Announcement
            </label>
          )}

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question, share packing advice, or coordinate logistics..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <button
              type="submit"
              disabled={sending || !message.trim()}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
};

export default TripDiscussionBoard;
