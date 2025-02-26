import random
import tkinter as tk
from tkinter import messagebox

def generate_nature_painting_idea():
    painting_ideas = {
        "Landscapes": [
            "Dawn breaking over a misty mountain valley",
            "Sunlight filtering through a dense forest canopy",
            "A peaceful lake reflecting autumn foliage",
            "Wildflower meadows in full spring bloom",
            "Dramatic storm clouds gathering over an open plain"
        ],
        "Water Features": [
            "A hidden waterfall cascading over moss-covered rocks",
            "Tide pools at sunset with their miniature ecosystems",
            "A meandering stream cutting through a quiet woodland",
            "Ocean waves crashing against rugged coastal cliffs",
            "Morning fog lifting from a serene river"
        ],
        "Seasonal Inspirations": [
            "The first dusting of snow on colorful autumn leaves",
            "Cherry blossoms or magnolias announcing spring",
            "Summer's golden hour lighting up a grassy hillside",
            "The stark beauty of bare winter trees against a gray sky"
        ],
        "Wildlife Settings": [
            "A natural clearing where deer or other wildlife gather",
            "Birds in their native habitat—perhaps a heron in a marsh",
            "Butterfly gardens with native flowering plants",
            "Ancient trees that serve as habitat for various creatures"
        ],
        "Unique Perspectives": [
            "Looking up through tree branches toward the sky",
            "A macro view of dewdrops on spider webs or leaves",
            "The play of shadows and light on natural textures",
            "A panoramic vista from a high vantage point"
        ]
    }
    
    # Choose a random category
    category = random.choice(list(painting_ideas.keys()))
    
    # Choose a random idea from that category
    idea = random.choice(painting_ideas[category])
    
    return f"Category: {category}\nIdea: {idea}"

def show_idea():
    idea = generate_nature_painting_idea()
    result_text.delete(1.0, tk.END)
    result_text.insert(tk.END, idea)

def save_favorites():
    current_idea = result_text.get(1.0, tk.END).strip()
    if current_idea:
        with open("favorite_painting_ideas.txt", "a") as file:
            file.write(current_idea + "\n\n")
        messagebox.showinfo("Saved", "Idea saved to favorite_painting_ideas.txt")

# Create the main window
root = tk.Tk()
root.title("Nature Painting Idea Generator")
root.geometry("500x300")
root.configure(bg="#e6f2e6")  # Light green background

# Create a frame for better organization
main_frame = tk.Frame(root, bg="#e6f2e6", padx=20, pady=20)
main_frame.pack(fill=tk.BOTH, expand=True)

# Add a title label
title_label = tk.Label(
    main_frame, 
    text="Nature Painting Inspiration", 
    font=("Arial", 16, "bold"),
    bg="#e6f2e6"
)
title_label.pack(pady=(0, 20))

# Create a text widget to display the idea
result_text = tk.Text(main_frame, height=6, width=50, font=("Arial", 12), wrap=tk.WORD)
result_text.pack(pady=10)

# Create a frame for buttons
button_frame = tk.Frame(main_frame, bg="#e6f2e6")
button_frame.pack(pady=10)

# Add buttons
generate_button = tk.Button(
    button_frame, 
    text="Generate Idea", 
    command=show_idea,
    bg="#4CAF50", 
    fg="white",
    font=("Arial", 12),
    padx=10
)
generate_button.grid(row=0, column=0, padx=10)

save_button = tk.Button(
    button_frame, 
    text="Save to Favorites", 
    command=save_favorites,
    bg="#2196F3", 
    fg="white",
    font=("Arial", 12),
    padx=10
)
save_button.grid(row=0, column=1, padx=10)

# Generate an idea when the program starts
show_idea()

# Start the main loop
root.mainloop()
