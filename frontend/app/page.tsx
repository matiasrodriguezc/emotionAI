"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { EmotionResults } from "@/components/emotion-results"
import { Brain, Sparkles, Github, Linkedin, Mail } from "lucide-react"

interface EmotionResult {
  label: string;
  score: number;
}

export default function Home() {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<EmotionResult[] | null>(null)
  const [error, setError] = useState<string | null>(null);

  const analyzeEmotion = async () => {
    if (!text.trim()) return

    setIsAnalyzing(true)
    setResults(null)
    setError(null);

    try {
      // 1. Obtenemos la URL BASE desde Vercel.
      //    (OJO: El fallback aquí NO debe tener /analyze)
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://matiasrodriguezc-emotion-ai-api.hf.space";
      
      // 2. Nos aseguramos de que la URL base NO tenga una barra al final
      const cleanBaseUrl = baseUrl.replace(/\/$/, '');

      // 3. Construimos la URL completa del endpoint
      const endpoint = `${cleanBaseUrl}/analyze`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.statusText}`);
      }

      const data: EmotionResult[] = await response.json();
      
      const sortedData = data.sort((a, b) => b.score - a.score);

      setResults(sortedData);

    } catch (err) {
      console.error("Fallo al contactar la API:", err);
      setError("No se pudo conectar con el modelo de análisis. Asegúrate de que el servidor backend esté funcionando.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  const exampleTexts = [
    "I'm so excited about this new opportunity! It's going to be amazing!",
    "I'm really worried about the upcoming presentation. What if something goes wrong?",
    "This is absolutely frustrating! Nothing is working as it should!",
    "I feel so lonely and disappointed. Nothing seems to go right anymore.",
  ]

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">EmotionAI</span>
          </div>
          
          <div className="flex items-center gap-2">
            <a href="https://github.com/matiasrodriguezc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://linkedin.com/in/matiasrodriguezc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </a>
            <a href="mailto:matiasrodriguezc01@gmail.com" aria-label="Email">
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Powered by XLNet</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Emotion Classification
            <span className="block text-primary mt-2">with Deep Learning</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Advanced natural language processing to detect emotions in text. Analyze sentiment across anger, fear, joy,
            and sadness with state-of-the-art accuracy.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-6 md:p-8 bg-card border-border">
            <div className="space-y-4">
              <div>
                <label htmlFor="text-input" className="block text-sm font-medium mb-2">
                  Enter text to analyze
                </label>
                <Textarea
                  id="text-input"
                  placeholder="Type or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] resize-none bg-background"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Try an example:</span>
                {exampleTexts.map((example, idx) => (
                  <Button key={idx} variant="outline" size="sm" onClick={() => setText(example)} className="text-xs">
                    Example {idx + 1}
                  </Button>
                ))}
              </div>

              <Button
                onClick={analyzeEmotion}
                disabled={!text.trim() || isAnalyzing}
                className="w-full md:w-auto"
                size="lg"
              >
                {isAnalyzing ? (
                  <span className="animate-pulse">Analyzing...</span>
                ) : (
                  "Analyze Emotion"
                )}
              </Button>
            </div>
          </Card>
          
          {error && (
            <Card className="p-4 bg-destructive/10 border-destructive/50">
              <p className="text-sm text-destructive text-center">{error}</p>
            </Card>
          )}

          {results && <EmotionResults results={results} />}
        </div>
      </section>

      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with XLNet for Sequence Classification • Fine-tuned on emotion datasets</p>
        </div>
      </footer>
    </main>
  )
}