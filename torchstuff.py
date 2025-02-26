import torch
from torch.utils.data import Dataset
from torch import Tensor

class MultiComponentDNFDataset(Dataset):
    """Generate a dataset for the multi-component DNF boolean function."""

    def __init__(self, N: int, comps: Tensor, num_samples: int = 10000) -> None:  # noqa: N803
        """Initialize dataset for the multi-component DNF boolean function.

        Args:
            N (int): Size of the input boolean string
            comps (Tensor): The DNF components (boolean valued) (Shape: (num_components, N))
            num_samples (int, optional): Size of the dataset. Defaults to 10000.
        """
        assert comps.shape[1] == N, (
            "The components should have the same size as the input"
        )
        assert len(comps.shape) == 2, "The components should be a 2D tensor"

        self.N = N
        self.num_samples = num_samples
        self.data = torch.randint(0, 2, (self.num_samples, self.N)).type(torch.int)
        self.labels = self.generate_labels(self.data, comps).type(torch.int)

    def __len__(self) -> int:  # noqa: D105
        return self.num_samples

    def __getitem__(self, idx: int) -> tuple[torch.Tensor, torch.Tensor]:  # noqa: D105
        return (self.data[idx], self.labels[idx])

    def generate_labels(self, data: Tensor, comps: Tensor) -> Tensor:
        """Generate the labels for the data.

        All tensors should have dtype int.

        Args:
            data (Tensor): Data to generate the labels for. (Shape: (num_samples, N))
            comps (Tensor): The DNF components of the function. (Shape: (num_components, N))

        Returns:
            Tensor: Labels for the data.
        """
        labels = torch.sum((data @ comps.T) % 2, dim=1) > 0

        return labels




