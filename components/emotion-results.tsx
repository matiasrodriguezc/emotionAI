"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Angry, Frown, Smile, Zap } from "lucide-react"

interface EmotionResult {
  label: string
  score: number
}

interface EmotionResultsProps {
  results: EmotionResult[]
}

const emotionConfig = {
  anger: {
    icon: Zap,
    color: "text-[oklch(0.65_0.25_25)]",
    bgColor: "bg-[oklch(0.65_0.25_25)]/10",
    barColor: "bg-[oklch(0.65_0.25_25)]",
    label: "Anger",
  },
  fear: {
    icon: Frown,
    color: "text-[oklch(0.60_0.20_280)]",
    bgColor: "bg-[oklch(0.60_0.20_280)]/10",
    barColor: "bg-[oklch(0.60_0.20_280)]",
    label: "Fear",
  },
  joy: {
    icon: Smile,
    color: "text-[oklch(0.75_0.20_120)]",
    bgColor: "bg-[oklch(0.75_0.20_120)]/10",
    barColor: "bg-[oklch(0.75_0.20_120)]",
    label: "Joy",
  },
  sadness: {
    icon: Angry,
    color: "text-[oklch(0.55_0.25_240)]",
    bgColor: "bg-[oklch(0.55_0.25_240)]/10",
    barColor: "bg-[oklch(0.55_0.25_240)]",
    label: "Sadness",
  },
}

export function EmotionResults({ results }: EmotionResultsProps) {
  const topEmotion = results[0]
  const config = emotionConfig[topEmotion.label as keyof typeof emotionConfig]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="p-6 md:p-8 bg-card border-border">
        <div className="space-y-6">
          {/* Top Result */}
          <div className="text-center pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-2">Dominant Emotion</p>
            <div className="flex items-center justify-center gap-3">
              <div className={`p-3 rounded-full ${config.bgColor}`}>
                <config.icon className={`w-6 h-6 ${config.color}`} />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold">{config.label}</h3>
                <p className="text-sm text-muted-foreground">{(topEmotion.score * 100).toFixed(1)}% confidence</p>
              </div>
            </div>
          </div>

          {/* All Results */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">All Predictions</h4>
            {results.map((result, index) => {
              const emotionConf = emotionConfig[result.label as keyof typeof emotionConfig]
              const Icon = emotionConf.icon

              return (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${emotionConf.color}`} />
                      <span className="font-medium">{emotionConf.label}</span>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">{(result.score * 100).toFixed(1)}%</span>
                  </div>

                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                      className={`h-full ${emotionConf.barColor} rounded-full`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Model Info */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Model: XLNet-base-cased • Fine-tuned on emotion datasets • 4-class classification
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
