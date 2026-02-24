"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, MoreHorizontal, User } from "lucide-react"

type Message = {
    id: string
    text: string
    sender: "bot" | "user"
    time: string
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        text: "Merhaba! 👋 Ermay Mobilya'ya hoş geldiniz. Size nasıl yardımcı olabilirim?",
        sender: "bot",
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
]

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [isShaking, setIsShaking] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    // Shake animation every 90 seconds
    useEffect(() => {
        if (isOpen) {
            setShowTooltip(false)
            return
        }

        const shakeInterval = setInterval(() => {
            setIsShaking(true)
            setShowTooltip(true)

            setTimeout(() => {
                setIsShaking(false)
            }, 1000)

            setTimeout(() => {
                setShowTooltip(false)
            }, 5000)
        }, 90000) // 90 seconds

        // Initial tooltip after 15 seconds
        const initialTip = setTimeout(() => {
            if (!isOpen) {
                setIsShaking(true)
                setShowTooltip(true)
                setTimeout(() => setIsShaking(false), 1000)
                setTimeout(() => setShowTooltip(false), 5000)
            }
        }, 15000)

        return () => {
            clearInterval(shakeInterval)
            clearTimeout(initialTip)
        }
    }, [isOpen])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: "user",
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Dummy "Tamam" response after 1.5 seconds
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Tamam. Sizinle en kısa sürede iletişime geçeceğiz. Başka bir sorunuz var mıydı?",
                sender: "bot",
                time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, botMsg])
            setIsTyping(false)
        }, 1500)
    }

    const shakeAnimation = {
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 flex w-[350px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-light-gray"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-navy p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 bg-gold flex items-center justify-center">
                                    <span className="font-serif font-bold text-white text-sm">ER</span>
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-navy bg-sage" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold leading-none">Ermay Asistan</h3>
                                    <span className="text-xs text-white/70">Çevrimiçi</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex h-80 flex-col gap-4 overflow-y-auto bg-cream/50 p-4 custom-scrollbar">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex max-w-[85%] flex-col ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                                        }`}
                                >
                                    <div
                                        className={`rounded-2xl px-4 py-2.5 shadow-sm ${msg.sender === "user"
                                                ? "bg-gold text-white rounded-tr-sm"
                                                : "bg-white text-charcoal border border-light-gray rounded-tl-sm"
                                            }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    <span className="mt-1 text-[10px] text-medium-gray px-1">{msg.time}</span>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex max-w-[85%] self-start items-start">
                                    <div className="rounded-2xl rounded-tl-sm bg-white border border-light-gray px-4 py-3 shadow-sm flex items-center gap-1">
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="h-1.5 w-1.5 rounded-full bg-medium-gray" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-medium-gray" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-medium-gray" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-light-gray bg-white p-3">
                            <form onSubmit={handleSend} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Mesajınızı yazın..."
                                    className="flex-1 rounded-xl border border-light-gray bg-cream px-4 py-2.5 text-sm outline-none transition-all focus:border-gold"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-colors hover:bg-navy/90 disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button and Tooltip */}
            <div className="relative">
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute bottom-1/2 right-16 mb-[-1.25rem] w-max rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-navy shadow-lg border border-light-gray after:absolute after:top-1/2 after:-right-2 after:mt-[-8px] after:border-[8px] after:border-transparent after:border-l-white"
                        >
                            Size nasıl yardımcı olabilirim? 👋
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => {
                        setIsOpen(!isOpen)
                        setShowTooltip(false)
                    }}
                    animate={isShaking && !isOpen ? shakeAnimation : {}}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-xl transition-colors hover:bg-navy/90"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                </motion.button>
            </div>
        </div>
    )
}
