import torch
from torch.utils.data import Dataset
from torch import Tensor

def generate_labels(data: Tensor, comps: Tensor) -> Tensor:
    """Generate the labels for the data.
    All tensors should have dtype int. Note that We aren't solving parity here, we are computing a conjunction. So a component should add one if that element of data @ comps.T is maximal.
    Args:
        data (Tensor): Data to generate the labels for. (Shape: (num_samples, N))
        comps (Tensor): The DNF components of the function. (Shape: (num_components, N))
    Returns:
        Tensor: Labels for the data.
    """
    labels = torch.sum((data @ comps.T) % 2, dim=1) > 0
    return labels

def create_multi_component_dnf_dataset(N: int, comps: Tensor, num_samples: int = 10000):
    """Create a dataset for the multi-component DNF boolean function.
    
    Args:
        N (int): Size of the input boolean string
        comps (Tensor): The DNF components (boolean valued) (Shape: (num_components, N))
        num_samples (int, optional): Size of the dataset. Defaults to 10000.
        
    Returns:
        tuple: A tuple containing (data, labels)
    """
    assert comps.shape[1] == N, "The components should have the same size as the input"
    assert len(comps.shape) == 2, "The components should be a 2D tensor"
    
    # Generate random data
    data = torch.randint(0, 2, (num_samples, N)).type(torch.int)
    
    # Generate corresponding labels
    labels = generate_labels(data, comps).type(torch.int)
    
    return data, labels

def create_multi_component_dnf_dataset_object(N: int, comps: Tensor, num_samples: int = 10000) -> Dataset:
    """Create a Dataset object for the multi-component DNF boolean function.
    
    Args:
        N (int): Size of the input boolean string
        comps (Tensor): The DNF components (boolean valued) (Shape: (num_components, N))
        num_samples (int, optional): Size of the dataset. Defaults to 10000.
        
    Returns:
        Dataset: A PyTorch Dataset object
    """
    data, labels = create_multi_component_dnf_dataset(N, comps, num_samples)
    
    # Create a simple dataset class using a closure
    class SimpleDataset(Dataset):
        def __len__(self):
            return num_samples
            
        def __getitem__(self, idx):
            return data[idx], labels[idx]
    
    return SimpleDataset()

# Example usage:
# N = 10
# comps = torch.tensor([[1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]])
# data, labels = create_multi_component_dnf_dataset(N, comps, 1000)
# 
# # Or if you need a Dataset object:
# dataset = create_multi_component_dnf_dataset_object(N, comps, 1000)