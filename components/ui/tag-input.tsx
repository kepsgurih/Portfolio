"use client"

import type React from "react"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface TagInputProps {
    placeholder?: string
    tags: string[]
    setTags: (tags: string[]) => void
    className?: string
}

export function TagInput({ placeholder, tags, setTags, className }: TagInputProps) {
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue) {
            e.preventDefault()
            if (!tags.includes(inputValue.trim()) && inputValue.trim() !== "") {
                setTags([...tags, inputValue.trim()])
                setInputValue("")
            }
        }
    }

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag))
    }

    return (
        <div className={className}>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="rounded-full hover:bg-muted p-0.5">
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {tag}</span>
                        </button>
                    </Badge>
                ))}
            </div>
            <Input placeholder={placeholder} value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
        </div>
    )
}